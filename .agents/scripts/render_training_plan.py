import fitz, os
pdf='attached_assets/خطة_الرواد_2026_1788556474984.pdf'
page_out='.agents/outputs/plan-pages'
img_out='.agents/outputs/plan-embedded'
os.makedirs(page_out, exist_ok=True)
os.makedirs(img_out, exist_ok=True)
doc=fitz.open(pdf)
print('pages', doc.page_count)
for i, page in enumerate(doc):
    pix=page.get_pixmap(matrix=fitz.Matrix(2,2), alpha=False)
    path=f'{page_out}/page-{i+1}.png'
    pix.save(path)
    print('rendered', path, pix.width, pix.height, 'embedded_images', len(page.get_images(full=True)))
seen=set()
for pno,page in enumerate(doc,1):
    for img in page.get_images(full=True):
        xref=img[0]
        if xref in seen:
            continue
        seen.add(xref)
        data=doc.extract_image(xref)
        path=f'{img_out}/xref-{xref}.{data["ext"]}'
        with open(path,'wb') as f:
            f.write(data['image'])
        print('extracted', path, data['width'], data['height'])
