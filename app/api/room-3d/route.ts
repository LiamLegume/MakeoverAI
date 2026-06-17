import { NextRequest, NextResponse } from "next/server";

const MESHY_IMAGE_TO_3D_URL = "https://api.meshy.ai/openapi/v1/image-to-3d";

type MeshyCreateResponse = {
  result?: string;
  message?: string;
};

type MeshyTaskResponse = {
  id?: string;
  status?: string;
  progress?: number;
  model_urls?: {
    glb?: string;
  };
  thumbnail_url?: string;
  task_error?: string | { message?: string };
  message?: string;
};

type Room3DRequest = {
  imageDataUrl?: string;
  imageUrl?: string;
  roomType?: string;
  theme?: string;
};

function getInputImage(payload: Room3DRequest) {
  const dataUri = payload.imageDataUrl?.trim();
  if (dataUri?.startsWith("data:image/")) {
    return dataUri;
  }

  const imageUrl = payload.imageUrl?.trim();
  if (imageUrl) {
    return imageUrl;
  }

  return "";
}

function normalizeStatus(status?: string) {
  const normalized = (status || "").toUpperCase();

  if (normalized === "SUCCEEDED") {
    return "succeeded";
  }

  if (normalized === "FAILED" || normalized === "CANCELED" || normalized === "EXPIRED") {
    return "failed";
  }

  if (normalized === "PENDING") {
    return "queued";
  }

  return "processing";
}

function extractTaskError(task: MeshyTaskResponse) {
  if (typeof task.task_error === "string") {
    return task.task_error;
  }

  if (task.task_error?.message) {
    return task.task_error.message;
  }

  return task.message || "The 3D model task failed.";
}

export async function POST(request: NextRequest) {
  let payload: Room3DRequest;

  try {
    payload = (await request.json()) as Room3DRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const inputImage = getInputImage(payload);

  if (!inputImage) {
    return NextResponse.json({ error: "Upload a room image before creating a 3D view." }, { status: 400 });
  }

  if (inputImage.startsWith("data:image/") && !/^data:image\/(png|jpeg|jpg);base64,/i.test(inputImage)) {
    return NextResponse.json(
      { error: "Meshy currently accepts JPG and PNG images for image-to-3D tasks." },
      { status: 415 }
    );
  }

  const apiKey = process.env.MESHY_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      provider: "demo",
      status: "missing-api-key",
      message: "Set MESHY_API_KEY to create real GLB models from uploaded room photos."
    });
  }

  const response = await fetch(MESHY_IMAGE_TO_3D_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_url: inputImage,
      ai_model: "latest",
      enable_pbr: true,
      image_enhancement: true,
      remove_lighting: true,
      should_remesh: true,
      should_texture: true,
      target_formats: ["glb"]
    })
  });

  const data = (await response.json().catch(() => ({}))) as MeshyCreateResponse;

  if (!response.ok || !data.result) {
    return NextResponse.json(
      { error: data.message || "Meshy could not start the 3D model task." },
      { status: response.ok ? 502 : response.status }
    );
  }

  return NextResponse.json({
    provider: "meshy",
    status: "queued",
    taskId: data.result
  });
}

export async function GET(request: NextRequest) {
  const taskId = request.nextUrl.searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json({ error: "Missing Meshy task id." }, { status: 400 });
  }

  const apiKey = process.env.MESHY_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      provider: "demo",
      status: "missing-api-key",
      message: "Set MESHY_API_KEY to poll Meshy 3D tasks."
    });
  }

  const response = await fetch(`${MESHY_IMAGE_TO_3D_URL}/${taskId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  const task = (await response.json().catch(() => ({}))) as MeshyTaskResponse;

  if (!response.ok) {
    return NextResponse.json(
      { error: task.message || "Could not read the Meshy 3D task." },
      { status: response.status }
    );
  }

  const status = normalizeStatus(task.status);

  return NextResponse.json({
    provider: "meshy",
    status,
    taskId: task.id || taskId,
    progress: task.progress || 0,
    modelUrl: task.model_urls?.glb || "",
    thumbnailUrl: task.thumbnail_url || "",
    error: status === "failed" ? extractTaskError(task) : ""
  });
}
