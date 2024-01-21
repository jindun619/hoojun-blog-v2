import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const directoryPath = path.join(process.cwd(), "posts");
    const files = fs.readdirSync(directoryPath);
    const newSlug = files.length + 1;
    const inputValues = req.body;
    // Markdown 파일 내용과 파일명을 정의
    const filename = `${newSlug}.md`;
    const frontmatter = `---
slug: "/${newSlug}"
date: "2024-01-02"
title: "${inputValues.title}"
tags: ${JSON.stringify(inputValues.tags)}
category: "${inputValues.category}"
references: ${JSON.stringify(inputValues.references)}
---`;
    const markdownContent = frontmatter + "\n" + inputValues.content;

    // 파일 경로 설정
    const filePath = path.join(process.cwd(), "/posts", filename);

    // 파일 쓰기
    fs.writeFile(filePath, markdownContent, "utf8", (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error writing file" });
      }
      res.status(200).json({ message: "File created successfully" });
    });
  }
}
