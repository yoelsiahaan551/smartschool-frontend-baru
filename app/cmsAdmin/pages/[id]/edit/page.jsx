import PageForm from '../../../../components/cms/PageForm';
import { dummyPages } from '../../../../../lib/dummyData';
import { notFound } from 'next/navigation';

export default function EditPagePage({ params }) {
  const { id } = params;
  const page = dummyPages.find((p) => p.id === parseInt(id));

  if (!page) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold">Edit Halaman</h1>
      </div>
      <PageForm initialData={page} isEdit={true} />
    </div>
  );
}