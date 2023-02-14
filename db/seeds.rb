# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
dummy_usernames = ["Jackie15", "Layton07", "Maria15", "Jill00" , "Ashley21"]
dummy_names = ["Jackie", "Layton", "Maria", "Jill", "Ashley"]
dummy_products = [
    {name: "Potted Plant", description: "A nice plant", price: "15.00", available: true},
    {name: "Hose 75ft", description: "A long hose", price: "34.99", available: true},
    {name: "Metal Plate", description: "A metal plate of unknown uses", price: "19.99", available: true},
    {name: "SSD 500gb", description: "This unknown brand SSD stores data", price: "79.99", available: true},
    {name: "Rare Cd", description: "A hard to find cd", price: "119.99", available: false}

]
p "Creating Users..."
dummy_usernames.each do |i|
    User.create(username: i , password: "abcd1234" , password_confirmation: "abcd1234", name: dummy_names[i])
end

p "Creating Products..."
# new product seed
User.first.products.create(dummy_products[0])
User.second.products.create(dummy_products[1])
User.third.products.create(dummy_products[2])
User.fourth.products.create(dummy_products[3])
User.fifth.products.create(dummy_products[4])

# old product seed
# 5.times do |i|
    # Product.create(dummy_products[i])
# end

# order template
# status: "open",
# delivery_date: 20230719,
# buyer_id: 4,
# price_total: 64.0

# order_items template
# quantity: 2,
# product_id: 4,
# order_id: 2