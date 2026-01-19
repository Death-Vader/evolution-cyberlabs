'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Icon from '@/components/ui/AppIcon';
import clsx from 'clsx';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  company: z.string().optional(),
  phone: z.string().min(10, 'Valid phone number required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message is too short'),
});

type FormData = z.infer<typeof schema>;

const ContactSection = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-6">Let's Secure Your Business</h2>
            <p className="text-lg text-muted-foreground mb-12">Ready to strengthen your security posture? Our experts are here to help.</p>
            <div className="space-y-8">
              <ContactInfoItem icon="PhoneIcon" title="Call Us" content="+91-XXXXXXXXX" sub="Mon - Fri, 9am - 6pm" />
              <ContactInfoItem icon="EnvelopeIcon" title="Email Us" content="contact@evolutioncyberlabs.com" sub="Response within 24 hours" />
              <ContactInfoItem icon="MapPinIcon" title="Visit Us" content="" sub="Mumbai, India" />
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8 shadow-2xl shadow-primary/5">
            {isSuccess ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-4"><Icon name="CheckCircleIcon" size={40} className="text-success" /></div>
                <h3 className="text-2xl font-bold">Inquiry Sent!</h3>
                <p className="text-muted-foreground mt-2">We will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" id="name" register={register} error={errors.name?.message} />
                  <Input label="Email" id="email" type="email" register={register} error={errors.email?.message} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <Input label="Company" id="company" register={register} error={errors.company?.message} />
                   <Input label="Phone" id="phone" type="tel" register={register} error={errors.phone?.message} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Interest</label>
                  <select {...register('service')} className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none">
                    <option value="">Select a service...</option>
                    <option value="pentest">Penetration Testing</option>
                    <option value="audit">Security Audit</option>
                    <option value="grc">GRC & Compliance</option>
                  </select>
                  {errors.service && <p className="text-sm text-destructive">{errors.service.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea {...register('message')} rows={4} className={clsx("w-full p-3 bg-background border rounded-lg focus:ring-2 outline-none resize-none", errors.message ? "border-destructive focus:ring-destructive" : "border-input focus:ring-primary")} placeholder="How can we help?" />
                  {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                </div>
                <button disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 disabled:opacity-70 transition-all flex justify-center items-center gap-2">
                  {isSubmitting ? <><Icon name="ArrowPathIcon" size={20} className="animate-spin" /> Sending...</> : 'Book Free Consultation'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
const ContactInfoItem = ({ icon, title, content, sub }: any) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><Icon name={icon} size={24} className="text-primary" /></div>
    <div><h3 className="font-bold text-foreground">{title}</h3><p className="text-foreground/80 font-medium">{content}</p><p className="text-sm text-muted-foreground">{sub}</p></div>
  </div>
);
const Input = ({ label, id, type = "text", register, error }: any) => (
  <div className="space-y-2"><label htmlFor={id} className="text-sm font-medium">{label}</label><input id={id} type={type} {...register(id)} className={clsx("w-full p-3 bg-background border rounded-lg focus:ring-2 outline-none transition-all", error ? "border-destructive focus:ring-destructive" : "border-input focus:ring-primary")} />{error && <p className="text-sm text-destructive">{error}</p>}</div>
);
export default ContactSection;