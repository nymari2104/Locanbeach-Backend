package com.locanbeach.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CloudinaryFileUploadService implements FileUploadService {

    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        String publicId = "the-house/" + UUID.randomUUID().toString();
        Map<?, ?> options = ObjectUtils.asMap(
                "public_id", publicId,
                "folder", "locanbeach"
        );
        Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), options);
        return result.get("secure_url").toString();
    }

    @Override
    public void deleteFile(String url) throws IOException {
        if (url == null || url.isEmpty()) return;
        try {
            int uploadIdx = url.indexOf("/upload/");
            if (uploadIdx == -1) return;

            String afterUpload = url.substring(uploadIdx + 8);
            int firstSlash = afterUpload.indexOf('/');
            if (firstSlash == -1) return;

            String publicIdWithExt = afterUpload.substring(firstSlash + 1);
            int lastDot = publicIdWithExt.lastIndexOf('.');
            String publicId = lastDot != -1 ? publicIdWithExt.substring(0, lastDot) : publicIdWithExt;

            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            // Log error but don't crash the main app transaction
            System.err.println("Failed to delete file from Cloudinary: " + e.getMessage());
        }
    }
}
