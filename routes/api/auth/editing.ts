import { Handlers } from "$fresh/server.ts";
import { contentType } from "$std/media_types/content_type.ts";
import { supabase } from "lib/db.ts";

interface UserEdit {
    id: string; // Assuming 'id' is used to identify which item to edit
    content: string;
  }

export const handler: Handlers = {
    async PUT(request) {
      try {
     
        const data: UserEdit = await request.json();
  
        if (!data.id) {
          return new Response("ID is required", { status: 400 });
        }
  
        const { error } = await supabase.from("posts") 
          .update({
            content: data.content
          })
          .eq('id', data.id);
  
        if (error) {
          throw new Error(error.message);
        }
  
        return new Response("Item updated successfully", { status: 200 });
      } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    },
};