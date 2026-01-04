

import { RESTDataSource } from "@apollo/datasource-rest";
import { CreatePostInput, Post } from "../types";



export class PostAPI extends RESTDataSource {
  baseURL = "http://localhost:6002/api/v1/";


  async getAllPosts() : Promise<Post[]> {
    const response = await this.get<{ success: boolean; message: string; data: Post[] }>("posts");
    return response.data; // ✅ return only the array
  };
  async getPostById(id: string) : Promise<Post> {
    const response = await this.get<{ success: boolean; message: string; data: Post }>(`posts/${id}`);
    return response.data; // ✅ return only the array
  };

//   async getReviewsByUser(id: string): Promise<Review[]>{
//     const response = await this.get<{ success: boolean; message: string; data: Review[] }>(`reviews/reviewsbyuser/${id}`);
//     return response.data; // ✅ return only the array
//   };
//   async getReviewsByPost(id: string):Promise<Review[]> {
//     const response = await this.get<{ success: boolean; message: string; data: Review[] }>(`reviews/reviewsbypost/${id}`);
//     return response.data; // ✅ return only the array
//   };

  async createPost(input: CreatePostInput): Promise<Post> {
  const res = await this.post<{ success: boolean; message: string; data: Post }> (`posts/create`, {
    body: input,
  });
  return res.data;
};

// async updateReview(id: string, input: UpdateReviewInput): Promise<Review> {
//   const res = await this.patch<{ success: boolean; message: string; data: Review }> (`reviews/update/${id}`, {
//     body: input,
//     // headers: { Authorization: `Bearer ${process.env.SERVICE_TOKEN}` },
//   });
//   return res.data;
// }

//    async deleteReview(id: string): Promise<boolean> {
//   await this.delete(`reviews/delete/${id}`);
//   return true;
// }



}