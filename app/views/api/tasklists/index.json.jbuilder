json.tasklists do
  json.array!(@tasklists) do |tasklist|
    json.title tasklist.title
  end
end
