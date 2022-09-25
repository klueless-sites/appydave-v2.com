---
layout: ~/layouts/BaseLayout.astro
title: FactoryBot and Faker in Rails 7
# pageTitle: Factory Bot - Guide | AppyDave
# description: 
---

I love building development tools, libraries, microapps and services



# Disadvantages of Faker
#   - In Unit Tests
#     - hard to search for some text that you see in a log because it is dynamic
#     - Non required attributes general don't need data provided (static or dynamic)
#     - Random data is not a recommended for test scenarios (from Rspec docs)
#       - Faker can create unstable tests, problems occur with some corner case values. These test will behave like a Heisenbug: randomly fails but because you cannot see what was the value Faker generated for the test it will be a pain in the back to find the vulnerable code part.
#       - Use static values to solve this problem
#     - Static values become well know two the developer, e.g. name: { 'Name 3' } is from the 3rd trait example
#
# Advantages of Faker
#   - In Unit Tests
#     - can Accidentally hit edge cases that developer never thought
#   - In Seed Data
#     - Can help make realistic data quickly

# Use FactoryBot::Syntax::Methods when you don't want to prefix with FactoryBot
