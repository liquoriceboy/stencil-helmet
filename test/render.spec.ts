import { VNode } from '../src/types';
import * as render from '../src/render';

beforeEach(() => {
  document.head.innerHTML = '';
});

describe('title', () => {
  const titleNode: VNode = {
    vtag: 'title',
    vchildren: [{
      vtext: 'bar'
    }]
  };

  it('should only render a valid title', () => {
    expect(render.title(titleNode, document.head))
      .toBeInstanceOf(Array);
    expect(render.title({ ...titleNode, vchildren: null }, document.head))
      .toBeUndefined();
  });

  it('should return two elements', () => {
    expect(render.title(titleNode, document.head))
      .toHaveLength(2);
  });
});

describe('meta', () => {
  const metaNode: VNode = {
    vtag: 'meta',
    vattrs: {
      name: 'foo',
      content: 'bar'
    }
  };

  it('should require name and content attributes', () => {
    expect(render.meta({ ...metaNode, vattrs: null }, document.head))
      .toBeUndefined();
    expect(render.meta({ ...metaNode, vattrs: { name: 'foo' } }, document.head))
      .toBeUndefined();
  });

  it('should return one element without a match', () => {
    expect(render.meta(metaNode, document.head))
      .toBeInstanceOf(HTMLElement);
  });

  it('should return two elements with a match', () => {
    document.head.innerHTML = `<meta name="foo" content="test"/>`;
    expect(render.meta(metaNode, document.head))
      .toHaveLength(2);
  });
});