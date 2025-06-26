import { useCsrfStore } from "@/stores/csrf-store";
import { ClassicLevelCreationRequest, ClassicLevelResponse, PlatformerLevelCreationRequest, PlatformerLevelResponse } from "../../../types/level"
import api from "@/lib/axios"

export async function createClassic(
    payload: ClassicLevelCreationRequest
): Promise<ClassicLevelResponse> {

    const response = await api.post<ClassicLevelResponse>(
        "/staff/classic-levels/create",
        payload,
        {
            withCredentials: true,
        }
    );

    return response.data;
}

export async function createPlatformer(
    payload: PlatformerLevelCreationRequest
): Promise<PlatformerLevelResponse> {
    const response = await api.post<PlatformerLevelResponse>(
        "/staff/platformer-levels/create",
        payload,
        { withCredentials: true }
    );

    return response.data;
}
