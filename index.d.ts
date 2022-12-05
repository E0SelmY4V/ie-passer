import { ChildProcessWithoutNullStreams } from 'child_process'
import { TransformOptions } from '@babel/core'
export namespace iePasser {
	type Conf = {
		opts: TransformOptions,
		out: string,
	}
	export let defConf: Conf
}
export function iePasser(
	path: string,
	test: { [testName: number | string]: () => void },
	conf: Conf,
): Promise<ChildProcessWithoutNullStreams>
export default iePasser