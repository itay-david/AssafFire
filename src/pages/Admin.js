import UploadForm from '../components/UploadForm';

export default function Admin() {
  return (
    <div className="p-6 text-right">
      <h1 className="text-2xl font-bold mb-4">אזור ניהול</h1>
      <UploadForm />
    </div>
  );
}
