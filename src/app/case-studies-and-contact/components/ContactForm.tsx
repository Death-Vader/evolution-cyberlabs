'use client';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';

const ContactForm = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  
  const onSubmit = async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Message sent!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card p-8 rounded-xl border border-border space-y-4">
      <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
      <div className="grid grid-cols-2 gap-4">
        <input {...register("name")} placeholder="Name" className="p-3 bg-background border rounded-lg" />
        <input {...register("email")} placeholder="Email" className="p-3 bg-background border rounded-lg" />
      </div>
      <textarea {...register("message")} placeholder="How can we help?" rows={4} className="w-full p-3 bg-background border rounded-lg" />
      <button disabled={isSubmitting} className="w-full py-3 bg-primary text-white rounded-lg font-bold">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
export default ContactForm;