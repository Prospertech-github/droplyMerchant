import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axios } from "@/utils/api";

async function editProfile(data: Record<string, any>) {
  const { data: response } = await axios.patch("auth/users/me/", data);

  return response.data;
}

export function useEditProfile() {
  const queryClient = useQueryClient();

  return useMutation(editProfile, {
    onSuccess() {
      queryClient.invalidateQueries(["auth/users/me/"]);
    },
  });
}

async function imageUpload(data: Record<string, any>) {
  if (data.image_file) {
    data.image = await fileToBase64(data.image_file);
  }

  const { data: response } = await axios.post("auth/image-upload", data);

  return response.data;
}

export function useImageUpload() {
  const queryClient = useQueryClient();

  return useMutation(imageUpload, {
    onSuccess() {
      queryClient.invalidateQueries(["auth/users/me/"]);
    },
  });
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result as string);
    };

    reader.onerror = function (error) {
      reject(error);
    };
  });
}

async function addOrg(data: Record<string, any>) {
  await axios.postForm("auth/organization/", data);
}

export function useAddOrg() {
  const queryClient = useQueryClient();

  return useMutation(addOrg, {
    onSettled: async () => {
      await queryClient.fetchQuery(["auth/users/me/"]);
    },
  });
}

async function updateOrg(data: Record<string, any>) {
  await axios.patch(`organizations/${data.id}/`, data);
}

export function useUpdateOrg() {
  const queryClient = useQueryClient();

  return useMutation(updateOrg, {
    onSuccess() {
      queryClient.invalidateQueries(["auth/users/me/"]);
    },
    onError(error) {
      if (isAxiosError(error)) {
        if (
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.response?.data?.detail
        ) {
          toast.error(
            error.response?.data?.message ||
              error.response?.data?.error ||
              error.response?.data?.detail
          );
        } else {
          toast.error("Something went wrong, try again");
        }
      }
    },
  });
}
