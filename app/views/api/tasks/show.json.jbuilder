json.taskCount @tasklist.active_task_count

json.task do
  json.partial! 'task', task: @task
end