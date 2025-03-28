type EmptyApiResponse = {
	is_success: boolean;
	error_message?: string;
};

type ApiResponse = {
	data: object;
} & EmptyApiResponse;


function SuccessApiResponse(data: any): ApiResponse {
    const successRes: ApiResponse = {
        data: data,
        is_success: true,
    }
    return successRes;
}


function ErrorApiResponse(error: any): EmptyApiResponse {
	const errorRes: EmptyApiResponse = {
		is_success: false,
		error_message: getErrorMessage(error),
	};
	return errorRes;
}

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

export type { ApiResponse };
export { ErrorApiResponse, SuccessApiResponse };
