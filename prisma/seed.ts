import { PrismaClient } from '@prisma/client'
import { RESIDENTS, ARCHIVE_SHOWS, schedule } from '../src/lib/schedule-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding DIVINE database with complete 40+ DJs, schedules, and archives...')

  // 1. Seed Residents
  for (const r of RESIDENTS) {
    await prisma.resident.upsert({
      where: { id: r.id },
      update: {
        name: r.name,
        showName: r.showName,
        genres: JSON.stringify(r.genres),
        avatarUrl: r.avatarUrl,
        bio: r.bio,
        mixcloudUrl: r.mixcloudUrl,
      },
      create: {
        id: r.id,
        name: r.name,
        showName: r.showName,
        genres: JSON.stringify(r.genres),
        avatarUrl: r.avatarUrl,
        bio: r.bio,
        mixcloudUrl: r.mixcloudUrl,
      },
    })
  }
  console.log(`Seeded ${RESIDENTS.length} resident DJs into database.`)

  // 2. Seed Archive Shows
  for (const a of ARCHIVE_SHOWS) {
    await prisma.archiveShow.upsert({
      where: { id: a.id },
      update: {
        title: a.title,
        dj: a.dj,
        genre: a.genre,
        date: a.date,
        duration: a.duration,
        channel: a.channel,
        avatarUrl: a.avatarUrl,
        mixcloudUrl: a.mixcloudUrl,
        listenCount: a.listenCount,
      },
      create: {
        id: a.id,
        title: a.title,
        dj: a.dj,
        genre: a.genre,
        date: a.date,
        duration: a.duration,
        channel: a.channel,
        avatarUrl: a.avatarUrl,
        mixcloudUrl: a.mixcloudUrl,
        listenCount: a.listenCount,
      },
    })
  }
  console.log(`Seeded ${ARCHIVE_SHOWS.length} archive shows into database.`)

  // 3. Clear and Seed Schedule Slots
  await prisma.scheduleSlot.deleteMany({})

  for (const s of schedule) {
    // find matching resident by name
    const resident = RESIDENTS.find(
      r => r.name.toLowerCase() === s.dj.toLowerCase() || r.showName.toLowerCase().includes(s.dj.toLowerCase())
    ) || RESIDENTS[0]

    await prisma.scheduleSlot.create({
      data: {
        id: s.id,
        day: s.day,
        slot: `${s.startTime} - ${s.endTime}`,
        channel: s.channel,
        residentId: resident.id,
        isLive: Boolean(s.isLive),
      }
    })
  }
  console.log(`Seeded ${schedule.length} schedule timetable slots into database.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Database seeding finished successfully!')
  })
  .catch(async (e) => {
    console.error('Seeding error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
