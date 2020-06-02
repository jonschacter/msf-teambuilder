# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
gog = Team.create(name: "Guardians of the Galaxy")

starlord = Character.create(name: "Star-Lord", power: 66923, team: gog)
rocket = Character.create(name: "Rocket Raccoon", power: 58599, team: gog)
groot = Character.create(name: "Groot", power: 67783, team: gog)
mantis = Character.create(name: "Mantis", power: 39004, team: gog)
drax = Character.create(name: "Drax", power: 28373, team: gog)

bo = Team.create(name: "Black Order")

maw = Character.create(name: "Ebony Maw", power: 60075, team: bo)
proxima = Character.create(name: "Proxima Midnight", power: 55294, team: bo)
corvus = Character.create(name: "Corvus Glaive", power: 44988, team: bo)
thanos = Character.create(name: "Thanos", power: 64587, team: bo)
cull = Character.create(name: "Cull Obsidian", power: 45202, team: bo)

inhumans = Team.create(name: "Inhumans")

yoyo = Character.create(name: "Yo-yo", power: 57979, team: inhumans)
bb = Character.create(name: "Black Bolt", power: 87897, team: inhumans)
quake = Character.create(name: "Quake", power: 32204, team: inhumans)
karnak = Character.create(name: "Karnak", power: 36901, team: inhumans)
crystal = Character.create(name: "Crystal", power: 42201, team: inhumans)