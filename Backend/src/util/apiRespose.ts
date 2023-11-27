interface ApiResponse {
    success: boolean,
    statusCode: number,
    data: unknown
}

export default (statusCode: number, data: unknown): ApiResponse => {
    return {
        success: statusCode.toString().startsWith("2"),
        statusCode: statusCode,
        data: data
    };
};