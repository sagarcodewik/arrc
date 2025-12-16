import classNames from 'classnames';
import styles from './style.module.scss';
import { ReactNode } from 'react';

interface ISection {
  children: ReactNode;
  customClass?: string;
  refInSection?: any;
}

const Section = ({ children, customClass, refInSection }: ISection) => {
  return (
    <section ref={refInSection} className={classNames(styles.Section, customClass)}>
      {children}
    </section>
  );
};

export default Section;
