json.tasklists do
  json.array!(@tasklists) do |tasklist|
    json.id tasklist.id
    json.title tasklist.title
    json.task_count tasklist.task_count
  end
end
