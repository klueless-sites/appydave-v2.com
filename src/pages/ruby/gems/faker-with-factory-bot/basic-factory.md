---
layout: ~/layouts/BaseLayout.astro
title: Setup a Basic Factory
---

## Overview

Setting up a factory for a simple model.

### Simple factory for a User model

```ruby
# the User model is inferred
FactoryBot.define do
  factory :user do
    first_name { "John" }
    last_name  { "Doe" }
    admin { false }
  end
end
```

```ruby
@john = create(:user)
```

### When the factory name does not match the model class

Provide a `class:` attribute to handle this scenario

```ruby
FactoryBot.define do
  factory :admin, class: "User" do
    first_name { "The" }
    last_name  { "Boss" }
    admin { true }
  end
end
```

```ruby
@boss = create(:admin)
```

### class: Class vs String

You can use either `class: User` or `class: "User"` when assigning a model to the factory.

It may seem desirable to access Model class directly for this paramater but beware that this could lead to performance issues in large test suites.

#### Good practice

```ruby
factory :admin, class: "User" do
end
```

Using `"User"` as a **string** will mean that the class is lazy loaded only when the factory is used.

#### Potential performance issue

```ruby
factory :admin, class: User do
end
```

Using `User` as a **class** will lead to eager loading.

In larger test suites each model will eager load as the factory definitions are loaded in memory, this could leave unit tests feeling sluggish.

## Use cases

### Sample data factory using Faker

This pattern is useful if you want to keep unit test factories separate from sample data generation factories.

```ruby
FactoryBot.define do
  factory :sample_user, class: "User" do
    first_name { Faker::Name.first_name }
    last_name  { Faker::Name.last_name }
    admin { Faker::Boolean.boolean(true_ratio: 0.2) }
  end
end
```

```ruby
@users = create_list(:sample_user)
```
