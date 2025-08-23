-- CreateTable
CREATE TABLE "public"."P2pTrancaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "senderId" INTEGER NOT NULL,
    "ReceiverId" INTEGER NOT NULL,

    CONSTRAINT "P2pTrancaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."P2pTrancaction" ADD CONSTRAINT "P2pTrancaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."P2pTrancaction" ADD CONSTRAINT "P2pTrancaction_ReceiverId_fkey" FOREIGN KEY ("ReceiverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
