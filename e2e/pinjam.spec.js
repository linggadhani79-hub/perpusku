import { test, expect } from "@playwright/test";

test("anggota dapat login dan meminjam buku", async ({ page }) => {
  await page.goto("http://localhost:5173/masuk");
  await page.getByLabel("Email").fill("rina@kampus.ac.id");
  await page.getByLabel("Kata sandi").fill("rahasia123");
  await page.getByRole("button", { name: "Masuk" }).click();
  await page.waitForURL("http://localhost:5173/");      // anggota diarahkan ke katalog
  await page.getByRole("button", { name: "Pinjam" }).first().click();
  await expect(page.getByText("Berhasil dipinjam")).toBeVisible();
});
