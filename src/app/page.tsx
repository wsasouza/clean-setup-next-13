import { db } from '@/db'
import { users } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export default async function Home() {
  const allUsers = await db.select().from(users)
  console.log(allUsers)

  async function addItem(data: FormData) {
    'use server'
    console.log(data)
    const fullName = data.get('full_name')?.toString()
    const phone = data.get('phone')?.toString()

    if (fullName && phone) {
      await db.insert(users).values({
        fullName,
        phone,
      })
    }

    revalidatePath('/')
  }
  return (
    <div className=" h-screen w-full  bg-zinc-900">
      <div className="mx-auto flex w-full max-w-[50rem] flex-col gap-6 p-4">
        <p className="flex flex-col text-zinc-100">
          {JSON.stringify(allUsers, null, 2)}
        </p>
        <form action={addItem} className="flex flex-col gap-4 text-zinc-100">
          <input
            type="text"
            placeholder="Nome completo"
            name="full_name"
            className="rounded-lg border border-zinc-500 bg-transparent p-4"
          />
          <input
            type="text"
            placeholder="Telefone"
            name="phone"
            className="rounded-lg border border-zinc-500 bg-transparent p-4"
          />

          <button
            type="submit"
            className="rounded-lg border border-emerald-800 bg-emerald-600 p-4 hover:bg-emerald-900 "
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  )
}
