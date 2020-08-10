const Produclist = function (
  id,
  name,
  image,
  description,
  price,
  inventory,
  rating,
  type
) {
  this.id = id;
  this.name = name;
  this.image = image;
  this.description = description;
  this.price = price;
  this.inventory = inventory;
  this.rating = rating;
  this.type = type;
  this.arr = [];
};
