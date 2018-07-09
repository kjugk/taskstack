json.tasklists do
  json.array!(@tasklists) do |tasklist|
    json.id tasklist.id
    json.title tasklist.title
  end
end
