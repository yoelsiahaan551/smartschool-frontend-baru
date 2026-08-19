import ArticleForm from '../../../../components/cms/ArticleForm';
import { dummyArticles } from '@/lib/dummyData';
import { notFound } from 'next/navigation';

export default function EditArticlePage({ params }) {
  const { id } = params;
  const article = dummyArticles.find((a) => a.id === parseInt(id));

  if (!article) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold">Edit Artikel</h1>
        
      </div>
      <ArticleForm initialData={article} isEdit={true} />
    </div>
  );
}