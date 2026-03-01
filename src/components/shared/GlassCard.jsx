import React from 'react';

const GlassCard = ({ children, className = '', title, icon: Icon }) => {
    return (
        <div className={`glass-card p-6 ${className}`}>
            {(title || Icon) && (
                <div className="flex items-center gap-3 mb-4">
                    {Icon && <Icon className="text-accent-main w-5 h-5" />}
                    {title && <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">{title}</h3>}
                </div>
            )}
            {children}
        </div>
    );
};

export default GlassCard;
