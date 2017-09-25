export default function getTagMessage(repositories) {
  let message = 'Projects included in this deployment are:-\n';
  repositories.forEach((repository) => {
    message = message.concat(`${repository.name}\n`);
  });

  return message;
}
