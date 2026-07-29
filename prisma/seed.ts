import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PRIMARY_PRODUCT_SLUG } from "../src/lib/constants";

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.upsert({
    where: { slug: PRIMARY_PRODUCT_SLUG },
    update: {},
    create: {
      slug: PRIMARY_PRODUCT_SLUG,
      name: "Pulse Pro Wireless ANC Earbuds",
      priceCents: 329000, // ৳3,290.00, stored as paisa
      isActive: true,
    },
  });
  console.log(`Product ready: ${product.name} (${product.slug})`);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? "Admin";

  if (!adminEmail || !adminPassword) {
    console.warn(
      "Skipping admin creation — set ADMIN_EMAIL and ADMIN_PASSWORD in .env to seed an admin user."
    );
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: adminName },
    create: { email: adminEmail, passwordHash, name: adminName },
  });
  console.log(`Admin ready: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
