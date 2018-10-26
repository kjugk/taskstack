FactoryBot.define do
  factory :subtask do
    task_id { 1 }
    title { "MyString" }
    completed { false }
  end
end
