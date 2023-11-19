export const getTaskTemplateFull = ({ title, text }) => {
  const markup = `
          
          <h2>${title}</h2>
          <div class="modal-text">
           ${text}
          </div>
          
       
    `;
  return markup;
};
