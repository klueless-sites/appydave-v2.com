---
layout: ~/layouts/BaseLayout.astro
title: Using nested or sub-factories
---

For all intents and purposes nested factories and sub-factories are the same.

They do have slightly different use-case and I'll give my opinion on when you might want to use nested vs sub-factories.

Traits and nested factories also share some similarities, but traits a better for composition while nested factories are good for inheritance - [Is A vs Has A](#traits-vs-nested-factories)


## Nested factory

### xxx

```ruby
factory :user do
  first_name { 'John' }

  factory :sample_user do
    first_name { FFaker::Name.first_name }
  end
end
```

### xxx

```ruby 
create :sample_user
See: Inheritance

Sub-factories
factory :user do
  ···
end
factory :sample_user, parent: :user do
  first_name { FFaker::Name.first_name }
end

```

## Is A/Has A

### IS A - Nested Factory

Establishes relationships between objects via inheritance

  - A cat IS a type of pet
  - A dog IS a type of pet
  - A rabit IS a type of pet

### Favourite pet example

```ruby
factory :pet do
  owner
  name { 'Fluffy' }
  type { :unknown }

  factory :pet_cat do
    name { Faker::Creature::Cat.name }
    type { :cat }
  end

  factory :pet_dog do
    name { Faker::Creature::Dog.name }
    type { :dog }
  end

  factory :pet_rabbit do
    type { :rabbit }
  end
end
```

```ruby
@fluffy = create(:pet_rabbit)
@puddy = create(:pet_cat)
@woofer = create(:pet_dog)
```

### HAS A - Traits

Establishes relationships between objects via composition.

  - A computer HAS a CPU
  - A computer HAS a Ram
  - A computer HAS a Operating System


### Computer with components example

```ruby
factory :computer do
  name { 'Personal Computer' }
  os { Faker::Computer.os }
  ram { %i[gb4 gb8 gb16 gb32].sample }
  cpu { %i[i5 i7 i9 m1 m2].sample }
  located { :work }

  trait :macbook_pro16 do
    name { 'MacBook Pro 16' }
    os { 'macOS 12 Monterey' }
    ram { :gb8 }
    cpu { :m2 }
  end

  trait :xps_desktop  do
    name { 'Dell XPS Desktop' }
    os { 'Windows 11 Home' }
    ram { :gb16 }
    cpu { :i7 }
  end

  trait :for_home do
    located { :home }
  end
end
```

```ruby
@work_laptop = create(:computer, :macbook_pro16)
@work_desktop = create(:computer, :xps_desktop)
@home_computer = create(:computer, :xps_desktop, :for_home)
```
