import React, { useEffect, useState } from 'react';
import {ImagesWithHeaderAndTextModule} from 'lib/shared-domain/page/domain/contentModule';
import {
	Section,
	Container
} from 'components/Layout';
import styles from './ImagesWithHeaderAndText.module.scss';
import { RichText } from 'components/BlogModules/RichText';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

export const ImagesWithHeaderAndText: React.FC<{
	specificContentModule: ImagesWithHeaderAndTextModule;
}> = ({ specificContentModule }) => {
	const {columns} = specificContentModule;

	return (
		<Section size={'md'} bg={'light'} color={'primary'}>
			<Container>
				<div className={styles.wrapper}>
					{Array.isArray(columns) && columns.map((column, i) =>
						<div key={i} className={styles.column}>
							{column.image.asset?.url &&
								<Image
									unoptimized
									loading="lazy"
									src={sanityImageUrlFor(column.image.asset?.url).quality(80).maxWidth(300).url()}
									fill
									alt={column.title}
									style={{
										maxWidth: '100%',
										objectFit: 'contain',
									}}
								/>
							}
							{column.title && <h5 className={styles.columnHeader}>{column.title}</h5>}
							{Array.isArray(column.textBlocks) &&
							<div className={styles.columnText}>
								<RichText content={column.textBlocks} />
							</div>
							}
						</div>
					)}
				</div>
			</Container>
		</Section>
	);
}
