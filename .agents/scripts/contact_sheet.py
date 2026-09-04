from PIL import Image, ImageOps, ImageDraw, ImageFont
import glob, os, math
files=sorted(glob.glob('.agents/outputs/plan-embedded/*'))
thumbs=[]
for path in files:
    im=Image.open(path).convert('RGB')
    im.thumbnail((260,170))
    canvas=Image.new('RGB',(300,220),'white')
    x=(300-im.width)//2; y=12+(170-im.height)//2
    canvas.paste(im,(x,y))
    d=ImageDraw.Draw(canvas)
    d.text((10,190),os.path.basename(path),fill='black')
    thumbs.append(canvas)
cols=3; rows=math.ceil(len(thumbs)/cols)
out=Image.new('RGB',(cols*300,rows*220),(225,225,225))
for i,im in enumerate(thumbs): out.paste(im,((i%cols)*300,(i//cols)*220))
out.save('.agents/outputs/plan-embedded/contact-sheet.jpg',quality=92)
