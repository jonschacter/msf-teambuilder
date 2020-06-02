# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
gog = Team.create(name: "Guardians of the Galaxy")

starlord = Character.create(name: "Star-Lord", power: 66,923, team: gog)
rocket = Character.create(name: "Rocket Raccoon", power: 58,599, team: gog)
groot = Character.create(name: "Groot", power: 67,783, team: gog)
mantis = Character.create(name: "Mantis", power: 39,004, team: gog)
drax = Character.create(name: "Drax", power: 28,373, team: gog)

bo = Team.create(name: "Black Order")

maw = Character.create(name: "Ebony Maw", power: 60,075, team: bo)
proxima = Character.create(name: "Proxima Midnight", power: 55,294, team: bo)
corvus = Character.create(name: "Corvus Glaive", power: 44,988, team: bo)
thanos = Character.create(name: "Thanos", power: 64,587, team: bo)
cull = Character.create(name: "Cull Obsidian", power: 45,202, team: bo)

inhumans = Team.create(name: "Inhumans")

yoyo = Character.create(name: "Yo-yo", power: 57,979, team: inhumans)
bb = Character.create(name: "Black Bolt", power: 87,897, team: inhumans)
quake = Character.create(name: "Quake", power: 32,204, team: inhumans)
karnak = Character.create(name: "Karnak", power: 36,901, team: inhumans)
crystal = Character.create(name: "Crystal", power: 42,201, team: inhumans)