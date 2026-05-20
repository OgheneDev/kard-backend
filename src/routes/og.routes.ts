import { Router, Request, Response } from "express";
import { getBrowser } from "../lib/browser";
import { renderTemplate, TemplateParams } from "../templates";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { title, description, site, theme } = req.query;

  if (!title || typeof title !== "string") {
    res.status(400).json({ error: "title is required" });
    return;
  }

  const params: TemplateParams = {
    title,
    description: typeof description === "string" ? description : undefined,
    site: typeof site === "string" ? site : undefined,
    theme:
      theme === "dark" || theme === "minimal" || theme === "editorial"
        ? theme
        : "editorial",
  };

  try {
    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 630 });
    await page.setContent(renderTemplate(params), {
      // Cast to any to satisfy differing type definitions for waitUntil
      waitUntil: "networkidle0" as any,
    });

    const screenshot = await page.screenshot({ type: "png" });
    await page.close();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(screenshot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

export default router;
