json.tasklistIds @current_user.tasklist_id_list
json.tasklists do
  json.partial! 'tasklist', collection: @tasklists, as: :tasklist
end
