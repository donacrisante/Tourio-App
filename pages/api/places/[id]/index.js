import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

  if (!id) {
    return;
  }

  if (!place) {
    return response.status(404).json({ status: "Not found" });
  }

  response.status(200).json(place);
}

if (request.method === "PATCH") {
  const placeData = request.body;
  await Place.findByIdAndUpdate(id, placeData);
  return response.status(200).json({ status: "Place successfully updated." });
}

if (request.method === "DELETE") {
  const placeData = request.body;
  await Place.findByIdAndDelete(id);
  return response.status(200).json({ status: "Place successfully deleted." });
}
}
