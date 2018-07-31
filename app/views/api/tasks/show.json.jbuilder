json.taskCount @tasklist.active_task_count
json.taskIds @tasklist.task_id_list

json.task do
  json.partial! 'task', task: @task
end
