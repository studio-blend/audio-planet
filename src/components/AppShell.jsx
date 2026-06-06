'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import EnquiryModal from './EnquiryModal';

export default function AppShell({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const openModal = (product = null) => {
    // If product is a string, wrap it
    const productData = typeof product === 'string' ? { name: product } : product;
    setModalProduct(productData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalProduct(null);
  };

  useEffect(() => {
    // Attach trigger to window for ease of access from server/client pages
    window.openEnquiryModal = openModal;
    return () => {
      delete window.openEnquiryModal;
    };
  }, []);

  return (
    <div className="noise-wrapper">
      <CustomCursor />
      <Header onOpenModal={() => openModal('General Consultation')} />
      <div className="content-container">{children}</div>
      <Footer />
      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} product={modalProduct} />
    </div>
  );
}
