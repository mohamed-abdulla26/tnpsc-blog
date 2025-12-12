import connectMongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";

export async function GET(req) {
  const query = req.nextUrl.searchParams.get("q") || "";
  const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
  const limit = parseInt(req.nextUrl.searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  try {
    await connectMongo();

    let postData, totalPosts;

    if (query) {
      const searchQuery = {
        $or: [
          { title: new RegExp(query, "i") },
          { description: new RegExp(query, "i") },
        ],
      };
      totalPosts = await PostModel.countDocuments(searchQuery);
      postData = await PostModel.find(searchQuery)
        .skip(skip)
        .limit(limit)
        .lean(); // <-- convert to plain JS objects
    } else {
      totalPosts = await PostModel.countDocuments();
      postData = await PostModel.find({})
        .skip(skip)
        .limit(limit)
        .lean(); // <-- convert to plain JS objects
    }

    return new Response(
      JSON.stringify({
        posts: postData,
        total: totalPosts,
        page,
        pages: Math.ceil(totalPosts / limit),
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
