import { useRoute } from 'vue-router';
import { getString } from 'src/utils/resource';

export function useTitle() {
  const route = useRoute();

  function setTitleFromResource() {
    document.title = getString(`pages.${route.meta.title}`);
  }

  function setTitle(title) {
    document.title = title;
  }

  return { setTitleFromResource, setTitle };
}
