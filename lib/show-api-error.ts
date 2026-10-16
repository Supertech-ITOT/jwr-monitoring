import axios from "axios";
import { toast } from "sonner";

type ValidationError = {
  field?: string;
  message?: string;
};

type ApiErrorResponse = {
  errors?: ValidationError[] | Record<string, unknown>;
  message?: string;
};

export function showApiError(error: unknown): void {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const data = error.response?.data;

    // Validation errors array
    if (Array.isArray(data?.errors)) {
      data.errors.forEach((err: ValidationError) => {
        toast.error(err.field ? `${err.field}: ${err.message ?? "Validation error"}` : err.message || "Validation error");
      });

      return;
    }

    // Single validation object
    if (typeof data?.errors === "object" && data.errors !== null) {
      Object.entries(data.errors).forEach(([field, message]) => {
        toast.error(`${field}: ${String(message)}`);
      });

      return;
    }

    // Standard API message
    if (data?.message) {
      toast.error(data.message);
      return;
    }

    // Fallback Axios message
    toast.error(error.message || "Request failed");
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error("Something went wrong");
}
