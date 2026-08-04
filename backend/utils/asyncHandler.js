// Express 4 does not automatically forward rejected promises. This wrapper lets
// async controllers use normal throw/catch behavior with the shared error handler.
export function asyncHandler(controller) {
  return function handledController(request, response, next) {
    Promise.resolve(controller(request, response, next)).catch(next);
  };
}
