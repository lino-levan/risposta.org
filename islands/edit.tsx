import { useSignal } from "@preact/signals";

export interface EditPosts{
   // classId: string,
   // postId: number,
    //userID: number
}

export function EditIsland(props: EditPosts){
    const test = useSignal("");
    return( 
        <div>
            <button onClick = {() => {test.value = "clicked"}}>
                Click to Edit
        </button>
            {test.value}
        </div>
    )
}