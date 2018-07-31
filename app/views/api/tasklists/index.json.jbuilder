json.tasklists do
  json.partial! 'tasklist', collection: @tasklists, as: :tasklist
end
