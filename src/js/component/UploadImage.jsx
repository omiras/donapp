import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function UploadImage({ size, onUpload }) {
  const [uploading, setUploading] = useState(false);

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      //   let { error: uploadError } = await supabase.storage
      //     .from("products")
      //     .upload(filePath, file);

      //   if (uploadError) {
      //     throw uploadError;
      //   }
      //   console.log(file);

      onUpload(file);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div style={{ width: size }}>
        <label className="btn btn-primary" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
