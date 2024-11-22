import CustomResponse from "./bikes.success.js";
export function fakeController(req, res) {
    res.json(new CustomResponse("This is a response", { data: "data values here" }));
}
